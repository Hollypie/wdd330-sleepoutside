export default class Alerts {
    constructor(alertJson, displayAlert) {
        this.alertJson = '../json/alerts.json'
        this.elementAlert = 'alerts'
    }

    async fetchData() {
        try {
            const response = await fetch(this.alertJson)
            if (!response.ok) {
                throw new Error(`No good! status: ${response.status}`);
            }
            this.data = await response.json();
            console.log("Data fetched", this.data)
        } catch (error) {
            console.error("Error fetching data:")
        }
    }

    displayAlert() {
        const targetElement = document.getElementById(this.elementAlert)
        if (!targetElement) {
            console.error(`Target element with ID '${this.targetElement}' not found`)
            return
        }

        const section = document.createElement('section')
        
        this.data = JSON.stringify(this.data)
        this.data = JSON.parse(this.data)
        if (Array.isArray(this.data.alerts)) {
            this.data.alerts.forEach(item => {
                console.log(item)
                const message = item.message
                const background = item.background
                const color = item.color
                const p = document.createElement('p')
                p.innerHTML = message
                p.style.backgroundColor = background
                p.style.color = color
                section.appendChild(p)
            })
            targetElement.appendChild(section)

        } else {
            console.error("my array is not an array")
        }

        
    }

    async init() {
        await this.fetchData()
        if (this.data.alerts) {
            this.displayAlert()
        }
    }
}