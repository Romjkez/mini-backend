import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TestService } from '../../test/test.service';
import { CreateFinishedTestDto } from '../dto/create-finished-test.dto';
import { convertTestResultToInternal } from '../utils/convert-test-result-to-internal';
import { CreateFinishedTestInternalDto } from '../dto/create-finished-test-internal.dto';

@Injectable()
export class IsTestCompletedPipe implements PipeTransform {
  constructor(private readonly testService: TestService) {
  }

  async transform(dto: CreateFinishedTestDto): Promise<CreateFinishedTestInternalDto> {
    const test = await this.testService.getById(dto.test).toPromise();

    const convertedDto = convertTestResultToInternal(test, dto);
    if (convertedDto !== null) {
      return convertedDto;
    }
    throw new BadRequestException('TEST_NOT_COMPLETED');
  }
}

