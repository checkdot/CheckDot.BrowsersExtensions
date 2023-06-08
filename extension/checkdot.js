const apiDomain = 'https://node.checkdot.io';
const trackerURL = 'https://tracker.checkdot.io/project';

async function getRiskScoreItem(projectTicker, projectName) {
    if (projectTicker.length <= 0 || projectName.length <= 0) {
        console.warn(`Checkdot trust score extension error: can not get risk score item, empty ticket and/or name passed`);
        return null;
    }

    const url = `${apiDomain}/get-projects-by-tickers?tickers=${projectTicker.toUpperCase()}`;

    return await fetch(url)
        .then(response => response.json())
        .then(data => {
            let riskScoreItem
            if (data.length === 1) {
                // only one item was founded by ticker, use it
                riskScoreItem = data[0]
            } else {
                riskScoreItem = data.find(function (item) {
                    // Сheckdot.io can return 2+ results for one ticker if few projects use the same one.
                    // In this case we will compare project names.
                    // It is not the perfect solution because of from time to time project named differently on Checkdot.io and Coinmarketcap,
                    // but it will cover most of the cases
                    return item.projectName.toUpperCase() === projectName.toUpperCase();
                });
            }

            return riskScoreItem;
        })
        .catch(error => console.error(error));
}

function buildTrackerURL(riskScoreItem) {
    return `${trackerURL}/${riskScoreItem.id}`
}