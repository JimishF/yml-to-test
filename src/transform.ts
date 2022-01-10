import { Statement } from './types/Statement';

export const transform = (data: any): Statement[] => {
    let children: Statement[] = [];
    if (Array.isArray(data)) {
        for (let key in data) {
            const item = data[key];
            if (typeof item === 'string') {
                children.push(
                    new Statement({
                        typeName: 'todo',
                        title: item
                    })
                );
            } else {
                children = [...children, ...transform(item)];
            }
        }
    } else {
        for (let key in data) {
            children.push(
                new Statement({
                    typeName: 'describe',
                    children: transform(data[key]),
                    title: key
                })
            );
        }
    }

    return children;
};