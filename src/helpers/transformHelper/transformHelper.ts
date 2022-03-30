export class TransformHelper {
  static extractValue = <TOutput extends Record<string, any>>(
    value: string,
    template: string,
    notFoundReturn = undefined,
  ): TOutput | undefined => {
    const ret = {};
    const regex = /{{\w*}}/g;
    const variables: string[] = template.match(regex);
    let treatedValue = value;
    let treatedTemplate = template;

    variables.forEach((variable, index) => {
      const variableIndex = treatedTemplate.indexOf(variable);
      let separator = treatedTemplate.substring(0, variableIndex);

      if (variableIndex !== 0) {
        const startValue = treatedTemplate.substring(0, variableIndex);

        treatedTemplate = treatedTemplate.replace(startValue, '');
        treatedValue = treatedValue.replace(startValue, '');
      }

      treatedTemplate = treatedTemplate.replace(variable, '');

      let nextVariableIndex = template.length;
      if (variables.length > index + 1) {
        const nextVariable = variables[index + 1];
        nextVariableIndex = treatedTemplate.indexOf(nextVariable);
      }

      separator = treatedTemplate.substring(0, nextVariableIndex);

      treatedTemplate = treatedTemplate.replace(separator, '');

      if (treatedTemplate.length) {
        const separatorIndex = treatedValue.indexOf(separator);

        ret[
          variable.replace('{{', '').replace('}}', '')
        ] = treatedValue.substring(0, separatorIndex);

        treatedValue = treatedValue.substring(separatorIndex);
        treatedValue = treatedValue.replace(separator, '');
      } else {
        ret[variable.replace('{{', '').replace('}}', '')] = treatedValue;
      }
    });

    console.log('TransformHelper > extractValue', { value, template, ret });

    return variables.length ? ret : notFoundReturn;
  };
}
