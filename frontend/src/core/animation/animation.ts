const FRAME_TIME = 1000 / 120

type Reducer = [number, number]

type Reducers = {
    top?: Reducer,
    opacity?: Reducer,
    transform?: [Reducer, Reducer],
}

type AnimationReducer = {
    startValue: number,
    endValue: number,
    iterationsCount: number,
}

type Animation = {
    top: AnimationReducer|null,
    opacity: AnimationReducer|null,
    transform: [AnimationReducer, AnimationReducer]|null,
    time: number,
}

function createAnimation(reducers: Reducers, time: number = 150): Animation {
    const topReducer = reducers.top
    const opacityReducer = reducers.opacity
    const transformReducer = reducers.transform

    const iterationsCount = time / FRAME_TIME

    const createAnimationByReducer = (reducer: Reducer) => {
        return {
            startValue: reducer[0],
            endValue: reducer[1],
            iterationsCount: iterationsCount,
        }
    }

    return {
        top: topReducer
            ? createAnimationByReducer(topReducer)
            : null,
        opacity: opacityReducer
            ? createAnimationByReducer(opacityReducer)
            : null,
        transform: transformReducer
            ? [createAnimationByReducer(transformReducer[0]), createAnimationByReducer(transformReducer[1])]
            : null,
        time,
    }
}

async function animate(element: HTMLElement, animation: Animation) {
    const computedStyle = getComputedStyle(element)
    const elementUserSelect = computedStyle.getPropertyValue('user-select');
    const elementPointerEvents = computedStyle.getPropertyValue('pointer-events');
    element.style.userSelect = 'none'
    element.style.pointerEvents = 'none'
    const setTopCssValue = (top: number) => {
        element.style.top = `${top}px`
    }
    const setOpacityCssValue = (opacity: number) => {
        element.style.opacity = `${opacity}`
    }
    const setTransformCssValue = (x: number, y: number) => {
        element.style.transform = `translate(${x}px, ${y}px)`
    }
    const calculateDelta = (reducer: AnimationReducer) => {
        return (reducer.endValue - reducer.startValue) / reducer.iterationsCount
    }
    animation.opacity && setOpacityCssValue(animation.opacity.startValue)
    animation.top && setTopCssValue(animation.top.startValue)
    animation.transform && setTransformCssValue(animation.transform[0].startValue, animation.transform[1].startValue)

    const doWithInterval = (iterationsCount: number, doEveryTime: () => void, doWhenEnd: () => void) => {
        let iteration = 1;
        const timerId = setInterval(() => {
            doEveryTime()
            iteration++
            if (iteration >= iterationsCount) {
                clearInterval(timerId)
                doWhenEnd()
            }
        }, FRAME_TIME);
    }

    const animateValue = async (reducer: AnimationReducer, setter: (value: number) => void) => {
        return new Promise((resolve) => {
            const delta = calculateDelta(reducer)
            let currentValue = reducer.startValue + delta
            doWithInterval(
                reducer.iterationsCount,
                () => {
                    setter(currentValue)
                    currentValue += delta
                },
                () => {
                    setter(reducer.endValue)
                    resolve(undefined)
                }
            )
        })
    }
    const animateTransform = (reducerX: AnimationReducer, reducerY: AnimationReducer) => {
        return new Promise((resolve) => {
            const deltaX = calculateDelta(reducerX)
            const deltaY = calculateDelta(reducerY)
            let currentX = reducerX.startValue + deltaX
            let currentY = reducerY.startValue + deltaY
            doWithInterval(
                reducerX.iterationsCount,
                () => {
                    setTransformCssValue(currentX, currentY)
                    currentX += deltaX
                    currentY += deltaY
                },
                () => {
                    setTransformCssValue(reducerX.endValue, reducerY.endValue)
                    resolve(undefined)
                }
            )
        })
    }

    const timers = [
        animation.top && animateValue(animation.top, setTopCssValue),
        animation.opacity && animateValue(animation.opacity, setOpacityCssValue),
        animation.transform && animateTransform(animation.transform[0], animation.transform[1]),
    ].filter(timer => !!timer)

    return Promise.all(timers)
        .then(() => {
            element.style.userSelect = elementUserSelect
            element.style.pointerEvents = elementPointerEvents
        })
}

export {
    createAnimation,
    animate,
    FRAME_TIME,
}

export type {
    Reducer,
    AnimationReducer,
    Animation,
    Reducers,
}