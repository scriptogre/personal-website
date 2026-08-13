<script>
  let name = "";
  let email = "";
  let message = "";
  let isSubmitting = false;
  let isSuccess = false;
  let errorMessage = "";

  const submitForm = async () => {
    isSubmitting = true;
    isSuccess = false;
    errorMessage = "";

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    isSubmitting = false;

    const result = await response.json();

    if (response.ok) {
      console.log("Form submitted successfully");
      isSuccess = true;
      // Reset the form fields
      name = "";
      email = "";
      message = "";
    } else {
      console.error("Form submission failed: ", result.message);
      errorMessage = result.message || "Something went wrong, please try again.";
    }
  };
</script>

<form
  on:submit|preventDefault={submitForm}
  class="max-w-sm relative flex justify-center w-full flex-col rounded-3xl border border-transparent has-[input:valid]:border-red-800 has-[input:valid]:shadow-red-800 dark:has-[input:valid]:border-amber-500 dark:has-[input:valid]:shadow-amber-500 dark:bg-dark-gradient-lighter bg-neutral-50 p-8 text-start shadow-lg transition-[border-color,box-shadow] duration-500">
  {#if isSubmitting}
    <div
      id="overlay"
      class="absolute inset-0 z-50 flex items-center justify-center rounded-3xl bg-neutral-50/95 dark:bg-neutral-900/95">
      <span class="animate-pulse text-xl text-red-800 dark:text-amber-500">Sending...</span>
    </div>
  {/if}

  <h1 class="text-xs sm:text-sm font-['Sora_Variable'] font-semibold text-red-800 dark:text-amber-500">Contact</h1>
  <p class="mt-1.5 lg:mt-3 font-semibold text-2xl sm:text-3xl">Get in touch</p>
  <p class="mt-1.5 lg:mt-3 mb-6 text-sm sm:text-base">I'm always open to new opportunities and collaborations. Feel free to reach out to me!</p>

  <!-- Display submission status to the user -->
  {#if isSuccess}
    <p class="mb-6 font-[500] text-red-800 dark:text-amber-500">Message sent successfully!</p>
  {:else if errorMessage}
    <p class="mb-6 font-[500] text-red-800 dark:text-red-500">{errorMessage}</p>
  {/if}

  <input
    type="text"
    name="name"
    placeholder="Name"
    bind:value={name}
    class="mb-3 w-full rounded-lg border border-neutral-800/10 dark:border-neutral-400/5 bg-transparent px-4 py-2 transition-colors duration-200 outline-1 focus:border-transparent focus:outline-red-800/50 dark:focus:outline-amber-500/50 outline-none"
    required />
  <input
    type="email"
    name="email"
    placeholder="Email"
    bind:value={email}
    class="mb-3 w-full rounded-lg border border-neutral-800/10 dark:border-neutral-400/5 bg-transparent px-4 py-2 transition-colors duration-200 outline-1 focus:border-transparent focus:outline-red-800/50 dark:focus:outline-amber-500/50 outline-none"
    required />
  <textarea
    name="message"
    placeholder="Message"
    bind:value={message}
    class="mb-6 w-full rounded-lg border border-neutral-800/10 dark:border-neutral-400/5 bg-transparent px-4 py-2 transition-colors duration-200 outline-1 focus:border-transparent focus:outline-red-800/50 dark:focus:outline-amber-500/50 outline-none"
    required></textarea>

  <button
    type="submit"
    class="w-full rounded-lg bg-gradient-to-br text-white/95 dark:text-neutral-800 from-red-800 to-red-700 dark:from-amber-500 dark:to-orange-400 py-2 px-4 font-semibold text-neutral-800 font-['Sora_Variable'] border border-red-800 dark:border-transparent transition-colors duration-200 outline-1 focus:outline-amber-500 outline-none"
    disabled={isSubmitting}>
    Send
  </button>

</form>
