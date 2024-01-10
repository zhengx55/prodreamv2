import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execPromise = promisify(exec);

try {
    await execPromise(
        `npm config set "@tiptap-pro:registry" https://registry.tiptap.dev/,
`,
    );

    await execPromise(
        `npm config set "//registry.tiptap.dev/:_authToken" Q1t0XltVA/YyR2wmmd/ItSnZ+ByL/CKuKjDGF0VBlGVjBxPd6Mt0u6SL7mObc/Op
,
`,
    );
} catch (error) {
    throw new Error(
        `Please log in to the Vercel private registry to install \`@vercel-private\`-scoped packages:\n\`npm login --scope=@vercel-private\``,
    );
}