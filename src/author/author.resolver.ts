import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { AuthorsService } from './author.service';
import { Author } from './entities/author.entity';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => [Author])
  authors() {
    return this.authorsService.findAll();
  }

  @Query(() => Author)
  author(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOne(id);
  }

  @Mutation(() => Author)
  createAuthor(
    @Args('name') name: string,
    @Args('age', { type: () => Int }) age: number,
  ) {
    return this.authorsService.create(name, age);
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args('id', { type: () => Int }) id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('age', { type: () => Int, nullable: true }) age?: number,
  ) {
    return this.authorsService.update(id, name, age);
  }

  @Mutation(() => Author)
  deleteAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.delete(id);
  }
}
