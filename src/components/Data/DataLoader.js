
class DataLoader {
    // Data Arrays
    Events = [];
    Publications = [];
    ResearchAreas = [];
    Focuses = [];
    
    constructor() {
        // hope this file contains paths to data
        this.LoadData("/Content/Data.json");
    }
    LoadData(path) {
        fetch(path)
            .then(response => response.json())
            .then(data => {
                data.datapaths.map(item => {
                    this.FetchData(item);   
                    
                }
                );
                return true;
            })
            .catch(error => console.error('Error loading data:', error));
    }

    FetchData(url) {
    }
    
    FocusGenerator(data) {
        return (
            <>
            </>
        );
    }
    PublicationGenerator(data) {
        return (
            <>
            </>
        );
    }
    ResearchAreaGenerator(data) {
        return (
            <>
            </>
        );
    }
    EventGenerator(data) {
        return (
            <>
            </>
        );
    }

}
export default {
    DataLoader,
    LoadData,
    FetchData
}
