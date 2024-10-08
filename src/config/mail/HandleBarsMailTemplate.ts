import Handlebars, { template } from "handlebars";
import fs from "fs";

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class HandleBarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });
    const parseTemplate = Handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
