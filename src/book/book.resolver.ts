import {
  Resolver,
  Query,
  Args,
  Mutation,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BooksService } from './book.service';
import { AuthorsService } from '../author/author.service';
import { Book } from './entities/book.entity';
import { Author } from 'src/author/entities/author.entity';

@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
  ) {}

  @Query(() => [Book])
  books() {
    return this.booksService.findAll();
  }

  @Query(() => Book)
  book(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  createBook(
    @Args('title') title: string,
    @Args('authorId', { type: () => Int }) authorId: number,
  ) {
    return this.booksService.create(title, authorId);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('title', { nullable: true }) title?: string,
    @Args('authorId', { type: () => Int, nullable: true }) authorId?: number,
  ) {
    return this.booksService.update(id, title, authorId);
  }

  @Mutation(() => Book)
  deleteBook(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.delete(id);
  }

  @ResolveField(() => Author)
  author(@Parent() book: Book) {
    return this.authorsService.findOne(book.authorId);
  }
}
