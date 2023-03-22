import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CategoryEntity from './category.entity';
import CategoryNotFoundException from './exceptions/categoryNotFound.exception';
import UpdateCategoryDto from './dto/updateCategory.dto';

@Injectable()
export default class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  getAllCategories() {
    return this.categoriesRepository.find({ relations: ['posts'] });
  }

  async getCategoryById(id: number) {
    const category = await this.categoriesRepository.findOne({
      relations: ['posts'],
      where: { id: id },
    });
    if (category) {
      return category;
    }
    throw new CategoryNotFoundException(id);
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, category);
    const updatedCategory = await this.categoriesRepository.findOne({
      relations: ['posts'],
      where: { id: id },
    });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new CategoryNotFoundException(id);
  }
}
