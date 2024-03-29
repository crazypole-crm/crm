import {Router} from "../router/router";

type TargetType = '_blank' | '_self'


function goToUrl(url: string, target: TargetType|undefined = '_self') {
    const tagA = document.createElement('a')
    tagA.setAttribute('href', url)
    tagA.setAttribute('target', target)
    tagA.click()
}

function goToAuth() {
    goToUrl(Router.Auth.url())
}

export {
    goToUrl,
    goToAuth,
}