async function coingeckoHandler() {
    const projectTicker = document.querySelector('[data-symbol]')?.getAttribute('data-symbol');
    const projectName = document.querySelector('[data-coin-name]')?.getAttribute('data-coin-name');

    console.log()

    if (projectTicker.length <= 0 || projectName.length <= 0) {
        console.warn(`Checkdot trust score extension error: coingecko page structure was change, please contact developers`);
        return
    }

    let riskScoreItem = await getRiskScoreItem(projectTicker, projectName);

    if (riskScoreItem) {
        let style = getStyleForCoinGeckoScore(riskScoreItem.score)

        const insertHTML = `<div class="tw-flex tw-items-center tw-mt-3">
                            <div style="" data-controller="">
                                <div data-gecko-primer--tooltip-target="anchor" data-action="mouseenter->gecko-primer--tooltip#show"
                                     aria-describedby="tooltip" class="tw-inline-block">
                                    <a target="_blank" href="${buildTrackerURL(riskScoreItem)}">
                                        <button class="btn btn-sm tw-outline-btn-md center tw-p-0 tw-w-12 tw-mr-1"
                                                style="${style}; width: 110px;">Trust
                                            score: &nbsp;<span style="font-weight: bold;">${riskScoreItem.score}</span>
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div
                                class="tw-block tw-inline-flex tw-py-0.5 tw-h-5 tw-items-center tw-px-2 tw-rounded-md tw-text-xs tw-font-medium tw-bg-gray-100 tw-text-gray-800 tw-mb-1 md:tw-mb-0 dark:tw-text-white dark:tw-bg-white dark:tw-bg-opacity-5">
                                <i class="far fas tw-mr-0.5 star-color fa-star"></i>Powered by &nbsp;<a target="_blank"
                                                                                                            href="https://checkdot.io/">Checkdot.io</a>
                            </div>
                        </div>`

        $('[data-controller="coin-add-this"]').parent().parent().parent().parent().before($.parseHTML(insertHTML));

    } else {
        console.log(`risk tracker data not found for ${projectTicker.toUpperCase()} and ${projectName} on checkdot.io`);
    }
}

function getStyleForCoinGeckoScore(score) {
    const highScoreStyle = `background-color: rgb(57, 237, 146); color: rgb(11, 15, 25);`
    const mediumScoreStyle = `background-color: orange; color: rgb(11, 15, 25);`
    const lowScoreStyle = `background-color: red; color: white;`

    let style = lowScoreStyle;

    if (score >= 30) {
        style = mediumScoreStyle;
    }

    if (score >= 70) {
        style = highScoreStyle;
    }

    return style;
}