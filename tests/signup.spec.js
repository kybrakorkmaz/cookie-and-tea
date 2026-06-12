import {test, expect} from "@playwright/test";
/** @param {import('@playwright/test').Page} page */
test.describe("Sign Up & Login & Logout Full-Stack Integration", () => {
    test("should successfully communicate with cat_test_api on port 8001 to register a user", async ({page}) =>{
        // Catch any frontend console errors (like CORS blocks or connection failures)
        page.on('console', msg => {
            if(msg.type() === 'error') console.log(`Browser Error: ${msg.text()}`);
        });
        // Catch failed network requests explicitly
        page.on('requestfailed', request => {
            console.log(`Network Failure. ${request.url()} || Error: ${request.failure()?.errorText}`)
        })

        // Setup: a network listener
        const registerResponsePromise = page.waitForResponse(response =>
            response.url().includes("/api/v1/auth/sign-up")
        );

        // Instruct Firefox to navigate to signup react router
        await page.goto("/sign-up");

        // Fill out with custom data that matches their exact HTML attr
        await page.locator('input[name="name"]').fill("Kubra Test");

        // Generate a dynamic username/email so never hit duplicate key errors in PG
        const uniqueId = `tester_${Date.now()}`;
        await page.locator('input[name="username"]').fill(uniqueId);
        await page.locator('input[name=email]').fill(`${uniqueId}@cookieandtea.com`);

        // Interacts seamlessly with your custom Password components
        await page.locator('input[name="password"]').fill("Secret123!");
        await page.locator('input[name="confirmPassword"]').fill("Secret123!");

        // Click the PrimaryButton to trigger handleSubmit and Axios execution
        await page.getByRole('button', {name: /create my account!/i}).click();

        // Assertions: wait for the network call to finish and check the response
        const response = await registerResponsePromise;

        // Verifies your backend returned a 201 Created status code
        expect(response.status()).toBe(201);

        // Verifies that your useSignUp hook successfully reset the inputs back to empty strings
        await expect(page.locator('input[name="username"]')).toHaveValue('');
    })
})