#!/bin/bash

echo "🔧 Configurando Variables de Entorno en Vercel"
echo "=============================================="

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI no instalado. Instalando...${NC}"
    npm install -g vercel@latest
fi

# Login si es necesario
if ! vercel whoami &> /dev/null; then
    echo -e "${BLUE}🔐 Iniciando sesión en Vercel...${NC}"
    vercel login
fi

# Vincular proyecto si es necesario
if [ ! -f ".vercel/project.json" ]; then
    echo -e "${BLUE}🔗 Vinculando proyecto...${NC}"
    vercel link --yes
fi

echo -e "${BLUE}⚙️ Configurando variables de entorno...${NC}"

# Variables requeridas
declare -A ENV_VARS=(
    ["DATABASE_URL"]="URL de conexión a Neon PostgreSQL"
    ["GROQ_API_KEY"]="API Key de Groq para el chatbot"
    ["JWT_SECRET"]="Secreto para JWT (genera uno aleatorio)"
    ["UPSTASH_REDIS_REST_URL"]="URL de Upstash Redis (opcional)"
    ["UPSTASH_REDIS_REST_TOKEN"]="Token de Upstash Redis (opcional)"
)

# Función para agregar variable de entorno
add_env_var() {
    local var_name=$1
    local description=$2
    
    echo -e "${YELLOW}📝 Configurando $var_name${NC}"
    echo -e "${BLUE}   Descripción: $description${NC}"
    
    # Verificar si ya existe
    if vercel env ls | grep -q "$var_name"; then
        echo -e "${GREEN}   ✅ $var_name ya está configurada${NC}"
        return
    fi
    
    # Solicitar valor
    read -p "   Ingresa el valor para $var_name: " var_value
    
    if [ -z "$var_value" ]; then
        echo -e "${YELLOW}   ⚠️ Saltando $var_name (vacío)${NC}"
        return
    fi
    
    # Agregar a todos los entornos
    echo "$var_value" | vercel env add "$var_name" production
    echo "$var_value" | vercel env add "$var_name" preview
    echo "$var_value" | vercel env add "$var_name" development
    
    echo -e "${GREEN}   ✅ $var_name configurada${NC}"
}

# Configurar cada variable
for var_name in "${!ENV_VARS[@]}"; do
    add_env_var "$var_name" "${ENV_VARS[$var_name]}"
    echo ""
done

# Variables opcionales de Postgres (si están disponibles en el entorno)
POSTGRES_VARS=(
    "POSTGRES_URL"
    "POSTGRES_PRISMA_URL"
    "POSTGRES_URL_NON_POOLING"
    "POSTGRES_USER"
    "POSTGRES_HOST"
    "POSTGRES_PASSWORD"
    "POSTGRES_DATABASE"
)

echo -e "${BLUE}🔍 Verificando variables adicionales de PostgreSQL...${NC}"
for var in "${POSTGRES_VARS[@]}"; do
    if [ ! -z "${!var}" ]; then
        echo -e "${GREEN}✅ Configurando $var desde el entorno${NC}"
        echo "${!var}" | vercel env add "$var" production 2>/dev/null || true
        echo "${!var}" | vercel env add "$var" preview 2>/dev/null || true
        echo "${!var}" | vercel env add "$var" development 2>/dev/null || true
    fi
done

echo -e "${GREEN}🎉 Variables de entorno configuradas${NC}"
echo -e "${BLUE}📋 Variables configuradas:${NC}"
vercel env ls

echo -e "${YELLOW}💡 Notas importantes:${NC}"
echo -e "   • Si no tienes Upstash Redis, la app funcionará sin cache"
echo -e "   • Asegúrate de que DATABASE_URL apunte a tu base de datos Neon"
echo -e "   • El GROQ_API_KEY es necesario para el chatbot"
echo -e "   • Genera un JWT_SECRET aleatorio y seguro"

echo -e "${GREEN}✅ ¡Configuración completada!${NC}"
