export default function currency(value) {
    return (Intl.NumberFormat('pt-BR', {
                style: 'currency', currency: 'BRL'
            }).format(value)
    );
}
