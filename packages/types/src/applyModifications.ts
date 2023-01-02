import { CompProps } from "."

export const applyModifications = (
    comps: CompProps[],
    modifications?: Partial<CompProps>[]
) => {
    return comps.map((c) => {
        const mod = modifications?.find((m) => m.id === c.id);
        let newComp = c;
        if (newComp.type === "div")
            newComp.children = applyModifications(newComp.children, modifications);
        if (mod) newComp = { ...newComp, ...mod } as CompProps;
        return newComp;
    });
};