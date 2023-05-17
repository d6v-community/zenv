import { z } from "zod";

export function zenv<T extends z.Schema> (schema: T, env: NodeJS.ProcessEnv = process.env) {
    try {
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
