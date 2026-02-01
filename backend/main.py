import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_community.chat_models import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# --- Configuración Global ---
DATA_PATH = '../data'
MODEL_NAME = "gemma:2b"

app = FastAPI(title="Chatbot IA Local - RAG")

# Clase para recibir la pregunta por JSON
class ChatRequest(BaseModel):
    pregunta: str

# Variable global para mantener la cadena RAG en memoria
rag_chain = None

def initialize_rag():
    """
    Carga los documentos, crea los embeddings y configura la cadena RAG.
    """
    global rag_chain
    print("--- Inicializando el motor de IA (RAG) ---")

    # 1. Cargar documentos
    if not os.path.exists(DATA_PATH):
        raise Exception(f"La carpeta de datos {DATA_PATH} no existe.")
    
    loader = DirectoryLoader(DATA_PATH, glob="*.txt", loader_cls=TextLoader, loader_kwargs={'encoding': 'utf-8'})
    documents = loader.load()
    
    if not documents:
        print("ALERTA: No se encontraron documentos en la carpeta data.")
        return False

    # 2. Dividir documentos
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    texts = text_splitter.split_documents(documents)

    # 3. Crear embeddings y base de datos vectorial en memoria
    # Usamos InMemoryVectorStore para máxima compatibilidad en Windows sin dependencias extra
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vectorstore = InMemoryVectorStore.from_documents(documents=texts, embedding=embeddings)
    retriever = vectorstore.as_retriever()

    # 4. Configurar LLM (Ollama)
    llm = ChatOllama(model=MODEL_NAME)

    # 5. Crear Prompt
    template = """
    Responde la pregunta basándote únicamente en el siguiente contexto.
    Si la respuesta no está en el contexto, responde exactamente: "No tengo la información para responder a esa pregunta."

    Contexto: {context}

    Pregunta: {question}
    """
    prompt = ChatPromptTemplate.from_template(template)

    # 6. Crear la cadena
    rag_chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    
    print("--- Motor de IA listo ---")
    return True

@app.on_event("startup")
async def startup_event():
    """Se ejecuta al iniciar el servidor"""
    initialize_rag()

@app.get("/")
async def root():
    return {"status": "Servidor funcionando", "modelo": MODEL_NAME}

@app.post("/chat")
async def chat(request: ChatRequest):
    """Endpoint para chatear con la IA"""
    global rag_chain
    
    if rag_chain is None:
        raise HTTPException(status_code=500, detail="El motor de IA no está inicializado.")
    
    try:
        respuesta = rag_chain.invoke(request.pregunta)
        return {"respuesta": respuesta}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
