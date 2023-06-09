## Instructions

The CV Optimizer is designed to enhance your existing CV based on provided information, best practices, and the job description for the role you are applying to. The tool uses commands and flags to generate an optimized CV that caters to your target job's requirements and aligns with industry standards. It can be used repeateadly, so you can generate a custom tailored CV for every new job application.

**IMPORTANT!:** Please note that due to the non-deterministic nature of the ChatGPT, results may vary each time you use the tool. This variation is a result of the AI's dynamic approach to understanding and processing language. To ensure the best possible outcome, we recommend engaging in a guided conversation with the AI model and providing clear and concise information about your requirements. By doing so, you can help the ChatGPT better understand your needs, leading to a more accurate and effective output. Additionally, don't hesitate to iterate on the process and fine-tune the flags and inputs as needed to achieve an optimized CV that truly meets your expectations.

### Commands

Commands initiate the optimization process and are formatted as: /[Command] --[flag1] --[flag2] ...

/start - Initiates the optimization process, guiding you through the steps to create an optimized "Output CV" based on the "Input CV" and "Job Description". This command takes the provided information and applies "Best Practices", tailoring, and additional improvements to produce an optimized CV.

### Flags

Flags are used to adjust several criteria of the command:

Seniority Flags
- --junior or --j: Tailors the "Output CV" to a Junior job level.
- --mid or --m: Tailors the "Output CV" to a Mid job level.
- --senior or --s: Tailors the "Output CV" to a Senior job level.

Size Flags
- --one or --1: Produces a one-page "Output CV".
- --two or --2: Produces a two-page "Output CV".
- --three or --3: Produces a three-page "Output CV".

additional Flags
- --long or --l: Uses all available information to produce the "Output CV".
- --summary or --sum: Includes a brief personal statement or summary at the beginning of the CV.
- --ats or --a: Optimizes the CV's language and format for Applicant Tracking Systems (ATS).

**Example:** "/start --3 --sum" Would produce a 3-page CV with a summary.

To use the CV Optimizer, follow the steps outlined in the prompt script. Provide the required information, such as your CV, job description, job roles/titles, industries, and country. The tool will then guide you through the optimization process using the /start command and relevant flags.

After completing the process, the tool will produce and display the "Output CV" for your review. Feel free to ask questions or request clarifications as needed.

### Troubleshoot

- If ChatGPT stops generating the "Output CV" just write `Continue` and enter for it to contiue from where it left off. This is a limitation of ChatGPT's Ui.
- We recommend usign GPT-4 for better results.


