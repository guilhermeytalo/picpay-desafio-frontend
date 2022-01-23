import { FormGroup, FormControl } from '@angular/forms';
import { ModelInterface } from '../interfaces/model.interface';
import * as _ from 'lodash';
export class FormHelper {
  public form: FormGroup = new FormGroup({});

  constructor(objModel: ModelInterface) {
    this.createFormBuilder(objModel);
  }

  isDirtyOrTouched(fieldName: string) {
    const field = this.form.get(fieldName);
    return field.dirty || field.touched;
  }

  createFormBuilder(objModel): void {
    const validators = this.getFormValidators(objModel);

    const group: FormGroup = new FormGroup({});
    for (const key in objModel) {
      if (objModel.hasOwnProperty(key)) {
        const control: FormControl = new FormControl('', validators[key] || []);
        if (
          typeof objModel[key] === 'object' &&
          Object.keys(objModel[key]).length > 0 &&
          isNaN(Number.parseInt(Object.keys(objModel[key])[0], 10))
        ) {
          const innerGroup: FormGroup = new FormGroup({});

          for (const innerKey in objModel[key]) {
            if (objModel[key].hasOwnProperty(innerKey)) {
              const innerControl: FormControl = new FormControl(
                {},
                validators[key] || []
              );
              innerGroup.addControl(innerKey, innerControl);
            }
          }

          group.addControl(key, innerGroup);
        } else {
          group.addControl(key, control);
        }
      }
    }

    this.form = group;
  }

  private getFormValidators(model: any) {
    try {
      return (model as ModelInterface).getValidationRules();
    } catch (err) {
      console.error(
        'Check if "' +
          model.constructor.name +
          '" class implements ModelForm interface'
      );
    }
    return {};
  }
}
