import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./services/prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api/v1");

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
