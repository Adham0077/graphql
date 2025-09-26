import { Module } from '@nestjs/common';
import { BooksService } from './book.service';
import { BooksResolver } from './book.resolver';
import { AuthorsModule } from 'src/author/author.module';

@Module({
  imports: [AuthorsModule],
  providers: [BooksResolver, BooksService],
})
export class BookModule {}
