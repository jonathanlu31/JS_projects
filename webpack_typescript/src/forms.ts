export const formData = (form: HTMLFormElement) => {
    const inputs = form.querySelectorAll('input');
    let data: {[prop: string]: string} = {};

    inputs.forEach(input => {
        data[input.id] = input.value;
    })

    return data;
}