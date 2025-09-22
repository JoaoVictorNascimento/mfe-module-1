// Data loader para produtos - executado no servidor (SSR)
export const loader = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products?limit=6');
    if (!response.ok) {
      throw new Error('Falha ao carregar produtos');
    }
    const products = await response.json();
    return {
      products,
    };
  } catch (error) {
    console.error('Erro no data loader:', error);
    return {
      products: [],
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
};
