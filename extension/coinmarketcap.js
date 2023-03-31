async function coinmarketcapHandler() {
    const projectTicker = $('small.nameSymbol').text();
    const projectName = $('span.fLa-dNu').text();

    if (projectTicker.length <= 0 || projectName.length <= 0) {
        console.warn(`Checkdot trust score extension error: coinmarketcap page structure was change, please contact developers`);
        return
    }

    let riskScoreItem = await getRiskScoreItem(projectTicker, projectName);

    if (riskScoreItem) {
        let style = getStyleForScore(riskScoreItem.score)

        const insertHTML = `<div class="sc-aef7b723-0 cevGxl" display="flex" style="flex-wrap:wrap; margin-bottom: 10px;">
                                <a target="_blank" href="${buildTrackerURL(riskScoreItem)}"><div class="namePill namePillPrimary"
                                     style="${style}">Trust score: ${riskScoreItem.score}
                                </div></a>
                                <div class="namePill">Powered by <a target="_blank" href="https://checkdot.io/">Checkdot.io</a></div>
                            </div>`

        $('.nameHeader').after($.parseHTML(insertHTML));

    } else {
        console.log(`risk tracker data not found for ${projectTicker.toUpperCase()} and ${projectName} on checkdot.io`);
    }
}

function getStyleForScore(score) {
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

