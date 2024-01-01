export const preventMinus = (e: any) => {
    if (e.code === 'Minus') {
        e.preventDefault();
    }
};

export const preventPasteNegative = (e: any) => {
    const clipboardData = e.clipboardData;
    const pastedData = parseFloat(clipboardData.getData('text'));

    if (pastedData < 0) {
        e.preventDefault();
    }
};