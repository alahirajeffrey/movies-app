import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MovieService } from "./movie.service";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, MovieService, PrismaService],
})
export class AppModule {}
