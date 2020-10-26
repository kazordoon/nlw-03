import CreateOrphanageDTO from '../contracts/CreateOrphanageDTO';

export default class OrphanageValidator {
  static validate({
    name,
    latitude,
    longitude,
    about,
    instructions,
    openingHours,
    openOnWeekends,
  }: CreateOrphanageDTO) {
    const errors: string[] = [];

    const nameFieldErrors = this.validateName(name);
    const latitudeFieldErrors = this.validateLatitude(latitude);
    const longitudeFieldErrors = this.validateLongitude(longitude);
    const aboutFieldErrors = this.validateAbout(about);
    const instructionsFieldErrors = this.validateInstructions(instructions);
    const openingHoursFieldErrors = this.validateOpeningHours(openingHours);
    const openOnWeekendsFieldErrors = this.validateOpenOnWeekends(openOnWeekends);

    errors.push(
      ...nameFieldErrors,
      ...latitudeFieldErrors,
      ...longitudeFieldErrors,
      ...aboutFieldErrors,
      ...instructionsFieldErrors,
      ...openingHoursFieldErrors,
      ...openOnWeekendsFieldErrors,
    );

    return errors;
  }

  static validateName(name: string) {
    const errors: string[] = [];

    const isEmpty = !name;
    if (isEmpty) {
      errors.push('O campo "nome" é obrigatório.');
    }

    const maxLength = 100;
    if (name.length > maxLength) {
      errors.push('O campo "nome" deve ter no máximo 100 carácteres.');
    }

    return errors;
  }

  static validateLatitude(latitude: number) {
    const errors: string[] = [];

    const isEmpty = String(latitude).length === 0;
    if (isEmpty) {
      errors.push('O campo "latitude" é obrigatório.');
    }

    const minDegrees = -90;
    const maxDegrees = 90;

    if (latitude < minDegrees || latitude > maxDegrees) {
      errors.push('A latitude deve estar entre -90 e 90 graus.');
    }

    return errors;
  }

  static validateLongitude(longitude: number) {
    const errors: string[] = [];

    const isEmpty = String(longitude).length === 0;
    if (isEmpty) {
      errors.push('O campo "longitude" é obrigatório.');
    }

    const minDegrees = -180;
    const maxDegrees = 180;

    if (longitude < minDegrees || longitude > maxDegrees) {
      errors.push('A longitude deve estar entre -180 e 180 graus.');
    }

    return errors;
  }

  static validateAbout(about: string) {
    const errors: string[] = [];

    const isEmpty = !about;
    if (isEmpty) {
      errors.push('O campo "sobre" é obrigatório.');
    }

    const maxLength = 300;
    if (about.length > maxLength) {
      errors.push('O campo "sobre" deve ter no máximo 300 carácteres.');
    }

    return errors;
  }

  static validateInstructions(instructions: string) {
    const errors: string[] = [];

    const isEmpty = !instructions;
    if (isEmpty) {
      errors.push('O campo "instruções" é obrigatório.');
    }

    const maxLength = 500;
    if (instructions.length > maxLength) {
      errors.push('O campo "instruções" deve ter no máximo 300 carácteres.');
    }

    return errors;
  }

  static validateOpeningHours(openingHours: string) {
    const errors: string[] = [];

    const isEmpty = !openingHours;
    if (isEmpty) {
      errors.push('O campo "horário de abertura" é obrigatório.');
    }

    const maxLength = 80;
    if (openingHours.length > maxLength) {
      errors.push('O campo "horário de abertura" deve ter no máximo 80 carácteres.');
    }

    return errors;
  }

  static validateOpenOnWeekends(openOnWeekends: boolean) {
    const errors: string[] = [];

    const isEmpty = String(openOnWeekends).length === 0;
    if (isEmpty) {
      errors.push('Você deve marcar se o orfanato abre ou não aos finais de semana.');
    }

    return errors;
  }
}
