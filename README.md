# Background

As solar energy is gaining in popularity, more and more homeowners are interested in going solar. However, whether
or not it is worth for someone to go solar depends on many different factors including the roof structure, local
weather, utility rates, energy consumption, and incentives. Therefore, it would be interesting to homeowners to have
a simple tool that allows them to assess whether or not their house would be a potential fit for going solar.

# Task

Your task is to design a web application (frontend only) that lets users design their own solar installation and evaluate
whether it makes sense for them to go solar. To do this, we want you to implement the following components (see
the sections below for more detail):

* Drawing tool​: Using Google Maps API, allow the user to outline roof face(s), specify roof pitch and
azimuth and fill it with modules.

* Performance calculation​: Use the PVWatts API to simulate the system that the user designed. See 1
below for more details.

* Financial Analysis​: Give the user an overview of the system they designed, including the following
information: total system size (in kW), annual and monthly energy production, system cost, total energy
savings per year, cumulative cashflow and payback period. Monthly energy production and cumulative
cashflow should be displayed as bar charts. How you display/visualize the rest of the information is up
to you.

## Part 1 : Drawing Tool

Build an application that allows the homeowner to outline a roof face by drawing a polygon on Google Maps. User
should be able to draw multiple roof faces and have separate inputs for all of them. The user will then have to
separately specify the pitch and azimuth (the cardinal direction the roof face is facing, expressed in degrees, where 0°
corresponds to due north). You can assume that the azimuth is always perpendicular to one of the roof face (polygon)
edges.

The output of the drawing tool will be the system size (measured in kW). One can calculate the system size as [area of
the roof face] x [wattage per square meter]. The homeowner should be able to define the wattage per square meter
as this depends on how much sun the roof receives every year. A reasonable default for wattage per square meter is
222/m2

## Part 2 : Performance Calculation

You will need to send PVWatts a GET request with the latitude and longitude of the house, the tilt and azimuth of
the panels, as well as the system_capacity of the system (in kW), defined as [number of panels] x [wattage of each
panel]. You can assume that all panels are mounted flush on the roof face, so their tilt equals the pitch of the roof
face. PVWatts takes in a number of other parameters, but you need not worry about these for the time being and you
can leave them at their default value. Note that you may have to request an API key from PVWatts (this is free). As a
first pass, you can stub out this functionality with a function that calculates the energy production per month based
as [system size in kW] x [1,400 kWh / kW / year], and then return to implement the API call as described above.

## Part 3 : Financial Analysis

Display the following information for the homeowner: total system size (in kW), annual and monthly energy
production, system cost, total energy savings per year (see below), cashflow and payback period. The monthly energy
production and cumulative cashflow table should be displayed using bar charts. Feel free to use any library you want
for the tables. The annual and monthly energy production will be outputs from the PVWatts API call. See the
following for definitions on other terms.

### System Cost

While there are many factors influencing system cost, a common way to price a system is on a “cost per watt” basis.
So for example a 5kW system which costs $4/W will cost $20,000. For the purposes of this project, you can assume a
fixed cost of $3.50/W.

### Energy Savings

In the end, one very important piece of information that the homeowner wants to see is how much her energy bill
will get reduced due to the solar system. In reality, determining this is quite a complicated matter, however for the
purposes of this project, the utility rate is an input (in $/kWh) and the energy savings for a given time period can be
calculated as [kWh produced during the period] x [utility rate]. A good default utility rate is $0.14/kWh.

### Cumulative Cashflow and payback period

To the homeowner, one of the most important pieces of information is what the cumulative cashflow and payback
period of going solar will look like. Since we do not receive money for going solar, one of the `revenues` of going solar
is the bill savings you get each year. There are other things that we will ignore for now, but for the purpose of this
project, the cumulative cashflow for year i = (cumulative cashflow of year i-1) + bill savings in year i, and the
cumulative cashflow of year 0 is equal to the initial investment, meaning the system cost.

### Assumptions

* You only need to support one solar panel, namely the SunPower X21-335-BLK , which has a nominal 2
power of 335W and dimensions of 1558mm x 1036mm

* The application only needs to work for locations inside the United States

* Your application only needs to handle a single roof face at a time

* You can assume the system is paid for in cash.

## Deliverables
1) A working demo
2) The source code
3) Written response (see below)

We will be evaluating the structure, quality as well as the functionality of the code. Please follow general software
engineering best practices and code as if this was a collaborative project at Aurora. You have full flexibility when it
comes to the UI of the application.

NOTE: If you have feel time-constrained, We recommend that you stub out certain functionality to get a working
prototype. We prefer the code to be well-structured and high quality despite not being feature complete, rather than a
feature-complete product, with a unmaintainable codebase.

Source: https://us.sunpower.com/sites/sunpower/files/media-library/data-sheets/ds-x21-series-335-345-residential-solar-panels.pdf