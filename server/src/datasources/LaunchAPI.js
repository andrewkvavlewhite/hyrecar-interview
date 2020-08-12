const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v3/';
  }

  async getAllLaunches(rocketName, siteName, launchYear) {
    const query = {};
    if(rocketName) query.rocket_name = rocketName;
    if(siteName) query.site_name = siteName;
    if(launchYear) query.launch_year = launchYear;
    const launches = await this.get(`launches`,  query);
    return Array.isArray(launches) ? launches.map(launch => this.launchReducer(launch)) : [];
  }

  launchReducer(launch) {
      return {
        flightNumber: launch.flight_number,
        rocketName: launch.rocket.rocket_name,
        siteName: launch.launch_site.site_name,
        launchDate: launch.launch_date_unix,
      }
  }
}

module.exports = LaunchAPI;