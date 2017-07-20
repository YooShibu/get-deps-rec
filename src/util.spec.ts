import { once } from "./util";


describe("util", () => {

    describe("once", () => {
        it("should create function that can be executed only once", () => {
            const func = {
                add(x: number, y: number) { return x + y; }
            }
            spyOn(func, "add").and.callThrough();
            const _add = once(func.add);
            expect(_add(1, 2)).toBe(3);
            expect(_add(1, 2)).toBeUndefined();
            expect(func.add).toHaveBeenCalledTimes(1);
        });
    });
    
});