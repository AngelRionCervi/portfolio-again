import classNames from 'classnames/bind';

export function cx(styles: { readonly [key: string]: string }, bindings: { readonly [key: string]: boolean }) {
    const binds = classNames.bind(styles);
    return binds(bindings);
}
