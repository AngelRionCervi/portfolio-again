import classNames from 'classnames/bind';

export function cx(styles: { readonly [key: string]: string }, bindings: { readonly [key: string]: boolean } | Array<string>) {
    const binds = classNames.bind(styles);
    return binds(bindings);
}
