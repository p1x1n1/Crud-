import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start () {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
   .setTitle("TaskListService")
   .setDescription("Таск лист для управления задачами.")
   .setVersion("1.0")
   .addTag('p1x1n1')
   .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(PORT, () => console.log(`Starting on ${PORT}`));
}

start()
