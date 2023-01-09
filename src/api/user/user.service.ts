import { Inject, Injectable } from '@nestjs/common';
import { ModelClass, transaction } from 'objection';
import { User } from 'src/models';

@Injectable()
export class UserService {
  constructor(@Inject('User') private modelClass: ModelClass<User>) {}

  findAll() {
    return this.modelClass.query();
  }

  async findOne(id: number) {
    const user = await this.modelClass.query().findById(id).throwIfNotFound();
    console.log(user);
    if (!user) {
      throw user;
    }
    return { user };
  }

  create(props: Partial<User>) {
    return this.modelClass.query().insert(props).returning('*');
  }

  update(id: number, props: Partial<User>) {
    return this.modelClass
      .query()
      .patch(props)
      .where({ id })
      .returning('*')
      .first();
  }

  delete(id: number) {
    // return transaction(this.modelClass, async (_, trx) => {
    //   await this.noteTagsService.deleteByNoteId(id).transacting(trx);
    //   return this.modelClass
    //     .query()
    //     .delete()
    //     .where({ id })
    //     .returning('*')
    //     .first()
    //     .transacting(trx);
    // });
  }
}
