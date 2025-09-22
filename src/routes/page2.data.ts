// Data loader para categorias - executado no servidor (SSR)
export const loader = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) {
      throw new Error('Falha ao carregar categorias');
    }
    const categories = await response.json();
    return {
      categories,
    };
  } catch (error) {
    console.error('Erro no data loader:', error);
    return {
      categories: [],
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
};
