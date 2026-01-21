export function Header() {
  return `
    <header class="bg-blue-600 text-white px-6 py-4 flex justify-between  items-center">
      <div class="font-bold text-2xl space-x-6">
        LOGO
      </div>

      <nav class="text-xl font-semibold mx-16">
        <a href="index.html" class="hover:underline px-5">Chapa</a>
        <a href="caixa.html" class="hover:underline px-5">Caixa</a>
      </nav>
    </header>
  `;
}