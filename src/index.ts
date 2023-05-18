import { z } from "zod";

interface ZenvOptions {
    env?: Record<string, string>;
    parser?: (value: any) => any;
}

function parse (value: any) {
    try {
        return JSON.parse(value);
    }
    catch (error) {
        return value;
    }
}

export function zenv<T extends z.Schema> (schema: T, options: ZenvOptions = {}) {
    try {
        let env = options?.env || process.env;

        const parser = options?.parser || parse;
        env = Object.fromEntries(Object.entries(env).map(([key, value]) => [key, parser(value)]));

        const parsed = schema.parse(env);
        return parsed as z.infer<T>;
    } catch (error) {
        if (error instanceof z.ZodError) {
            let errorList: string[] = []
            errorList.push('ENV validation error:');
            for (const issue of error.issues) {
                errorList.push(['      ', issue.path.join('.'), issue.message].join(' '));
            }
            throw new Error(errorList.join('\n'));
        } else {
            throw error;
        }
    }
}

export { z };
