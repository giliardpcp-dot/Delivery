FROM alpine:latest

# Instala dependências essenciais
RUN apk add --no-cache ca-certificates unzip wget

# Baixa a versão estável do PocketBase
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.14/pocketbase_0.22.14_linux_amd64.zip -O /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/
RUN rm /tmp/pb.zip

# Cria a pasta persistente para salvar os dados (pedidos, usuários, etc.)
RUN mkdir /pb/pb_data

EXPOSE 8090

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]
