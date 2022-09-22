import { Row, Col, FormSelect, FormControl } from "react-bootstrap"; 
import { useState, useEffect } from "react";

const getWeek = (date) => {
    // TODO Change first day each year
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const milliseconds = date - firstDay; // How many milliseconds have passed
    return Math.ceil(milliseconds / 1000 / 60 / 60 / 24 / 7)
  }

const Month = ({from, setFrom}) => {

    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const getMonths = () => {
        const d = new Date(from);
        let months = [];
        for (let i=0; i < 12; i++){
            const m = d.getMonth();
            months.push(month[m]);
            d.setMonth(m + 1);
        }
        return months
    }

    const getYears = () => {
        const d = new Date(from);
        let years = [];
        for ( let y = 2020; y < d.getFullYear()+3; y++ ) {
            years.push(y)
        }
        return years;
    }

    const handleMonthSelect = (e) => {
        const d = new Date(from);
        d.setHours(0,0,0,0);
        d.setMonth( e.target.value );
        d.setDate(1);
        setFrom(d);
    }

    const handleYearSelect = (e) => {
        const d = new Date(from);
        d.setHours(0,0,0,0);
        d.setFullYear( e.target.value );
        d.setDate(1);
        setFrom(d);
    }

    return (
        <div>
            <Row className="mt-3 justify-content-center">
                <Col xs={5} md={3} lg={2}>
                    <FormSelect onChange={handleMonthSelect} value={month[from.getMonth()]}>
                        {getMonths().map( (m, idx) => <option key={idx} value={month.indexOf(m)}>{m}</option> )}
                    </FormSelect>
                </Col>
                <Col xs={4} md={2}>
                    <FormSelect onChange={handleYearSelect} value={from.getFullYear()}>
                        {getYears().map( (m,idx) => <option key={idx}>{m}</option> )}
                    </FormSelect>
                </Col>
            </Row>

        </div>
    )
}

const Week = ({from, setFrom}) => {

    const [selected, setSelected] = useState(51);
    const [weekOptions, setWeekOptions] = useState([]);

    const handleSelect = (e) => setSelected(e.target.value);

    useEffect(() => {
        const d = new Date(weekOptions[selected]);
        d.setDate( d.getDate() - d.getDay() + 1);
        d.setHours(0,0,0,0);
        setFrom(d);
    }, [selected, setFrom, weekOptions]);

    useEffect(()=>{
        const d = new Date()
        let weeks = []
        d.setDate( d.getDate() - d.getDay() - 363);
        d.setHours(0,0,0,0);
        for (let i = -52; i < 52; i++){
            d.setDate( d.getDate() + 7 );
            weeks.push( new Date(d) )
        }
        setWeekOptions(weeks)
        return () => setWeekOptions([])
    },[setWeekOptions])

    return (
        <div>
            <Row className="mt-3 justify-content-center">
                <Col xs={3} md={2} lg={1} className="mt-auto mb-auto">
                    Week of:
                </Col>
                <Col xs={5} md={3} lg={2}>
                    <FormSelect value={selected} onChange={handleSelect}>
                        {weekOptions.map( (d, idx) => <option key={idx} value={idx}>{d.toLocaleDateString()} ({getWeek(d) % 2 === 1 ? 'B' : 'A'})</option> )}
                    </FormSelect>
                </Col>
            </Row>
        </div>
    )
}

const Day = ({from, setFrom}) => {

    const handleSelectDay = (e) => {
        const d = new Date(e.target.value);
        d.setHours(0,0,0,0);
        d.setDate( d.getDate() + 1 );
        setFrom(d);
    }

    return (
        <div>
            <Row className="mt-3 justify-content-center">
                <Col xs={6} md={3} lg={2}>
                    <FormControl type="date" value={from.toFormDateString()} onChange={handleSelectDay}/>
                </Col>
            </Row>
        </div>
    )
}

export {
    Week,
    Month,
    Day
}