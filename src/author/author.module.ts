import { Module } from '@nestjs/common';
import { AuthorsResolver } from './author.resolver';
import { AuthorsService } from './author.service';

@Module({
  providers: [AuthorsResolver, AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
