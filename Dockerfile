# Sử dụng một image Node.js làm base image
FROM node:16-alpine AS development

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies của ứng dụng
RUN npm install

# Sao chép các tệp và thư mục ứng dụng vào container
COPY . .

# Mở cổng mà ứng dụng sẽ lắng nghe trên
EXPOSE 4000

# Lệnh để khởi động ứng dụng
CMD ["node", "server.js"]
