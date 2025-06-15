import {create, UseBoundStore} from "zustand/react";
import {StoreApi} from "zustand/vanilla";
import {combine} from "zustand/middleware";
import {User} from "@/types";

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
    _store: S,
) => {
    let store = _store as WithSelectors<typeof _store>
    store.use = {}
    for (let k of Object.keys(store.getState())) {
        ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
    }

    return store
}

const {user} = window;

export const useStore = createSelectors(
    create(
        combine(
            {
                user: user as User | null
            },
            (set) => ({
                setUser: (user: User | null) => set({user}),
            })
        )
    )
)
