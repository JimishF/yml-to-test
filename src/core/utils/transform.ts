import { Statement, StatementType } from '../types/statement';

export const transform = (data: any): Statement[] => {
    let children: Statement[] = [];
    if (Array.isArray(data)) {
        children = transformFromArray(data);
    } else {
        children = transformFromObject(data);
    }
    return children;
};

function transformFromObject(data: any): Statement[] {
    const children: Statement[] = [];
    for (let key in data) {
        children.push(
            new Statement({
                typeName: StatementType.describe,
                children: transform(data[key]),
                title: key
            })
        );
    }
    return children;
}

function transformFromArray(data: any[]) {
    let children: Statement[] = [];

    for (let key in data) {
        const item = data[key];
        if (typeof item === 'string') {
            children.push(
                new Statement({
                    typeName: StatementType.todo,
                    title: item
                })
            );
        } else {
            children = [...children, ...transform(item)];
        }
    }
    return children;
}
