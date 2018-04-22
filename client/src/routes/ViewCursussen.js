import axios from 'axios';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { RingLoader } from 'react-spinners';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { compose } from 'redux';
import styled, { css } from 'styled-components';

export const centerCss = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 100%;
    min-height: 40vh;
    ${centerCss}
`;

class ViewCursussen extends React.Component {
    state = {
        data: null,
        dateFrom: moment(),
        dateTo: moment(),
        filterCursussen: false,
        selectedOption: '',
    };

    componentDidMount () {
        axios.get('http://206.189.9.129:3004/api/getAllCursus')
            .then(res => {
                this.setState({
                    data: res.data,
                });
            })
            .catch(err => {
                console.error(JSON.stringify(err));
            });
    }

    handleChange = (type) => (date) => {
        this.setState({
            [type]: date,
        });
    };

    renderCursistenFilters = () => {
        const { selectedOption, data: { cursussen } } = this.state;
        return (
            <div>
                <h3>Cursisten zien van een bepaalde cursus</h3>
                <Select
                    options={cursussen.map(cursus => {
                        return {
                            value: cursus.id,
                            label: cursus.cursustitel,
                        };
                    })}
                    value={selectedOption}
                    onChange={(val) => this.setState({ selectedOption: val || '' })}
                />
            </div>
        );
    };

    componentDidUpdate (prevProps, prevState) {
        if (prevState.selectedOption.length > 0 || prevState.selectedOption !== this.state.selectedOption) {
            axios.post('http://206.189.9.129:3004/api/getAllCursistenFromCursus', { cursusId: this.state.selectedOption.value })
                .then(response => {
                    this.setState({
                        cursistenData: response.data,
                    });
                })
                .catch(err => console.error(JSON.stringify(err)));
        }
    }

    render () {
        const momentWithPlugin = extendMoment(moment);
        let sum = 0;
        let cursussenFiltered = [];
        if (this.state.data) {
            // Get sum if not filtered as well
            if (this.state.filterCursussen === false) {
                this.state.data.cursussen.map(cursus => {
                    sum += (cursus.inschrijvingen.length * cursus.cursusprijs);
                });
            }

            const { data } = this.state;
            // Get sum if filtered
            data.cursussen.map((cursus) => {
                const dateEnd = moment(cursus.einddatum, 'YYYY-MM-DD');
                const range = momentWithPlugin.range(this.state.dateFrom, this.state.dateTo);
                const isCourseInRange = range.contains(dateEnd);
                // So, a course is in the filtered range
                if (isCourseInRange) {
                    cursussenFiltered.push(cursus);
                    sum += (cursus.inschrijvingen.length * cursus.cursusprijs);
                }
            });
        }
        return (
            <div>
                <Jumbotron style={{ padding: '2vw' }}>
                    <h1>Cursussen</h1>
                    <p>
                        Hier kan je een overzicht zien van alle cursussen, sorteren op datum en de totale opbrengst
                        zien.
                    </p>
                </Jumbotron>
                {!this.state.data && (
                    <Container>
                        <RingLoader
                            color={'#123abc'}
                            loading={true}
                        />
                    </Container>
                )}
                {this.state.data && (
                    <div>

                        <h3>Filteren op basis van datum vergelijkingen</h3>
                        <label>Van</label>
                        <DatePicker
                            dateFormat={'YYYY-MM-DD'}
                            selected={this.state.dateFrom}
                            onChange={this.handleChange('dateFrom')}
                        />
                        <label>Tot</label>
                        <DatePicker
                            dateFormat={'YYYY-MM-DD'}
                            selected={this.state.dateTo}
                            onChange={this.handleChange('dateTo')}
                        />
                        <label>Filter op basis van datum</label>
                        <input style={{ marginLeft: '2rem' }} type="checkbox" onChange={(e) => {
                            this.setState({
                                filterCursussen: e.target.checked,
                            });

                        }}/>

                        <br/>

                        {this.renderCursistenFilters()}

                        <div style={{ padding: '2rem' }}/>

                        {/* Show cursus variant of ReactTable if no cursus was selected */}
                        {
                            this.state.selectedOption.length <= 0 &&
                            <ReactTable
                                data={this.state.filterCursussen === true
                                    ? cursussenFiltered
                                    : this.state.data.cursussen
                                }
                                columns={[
                                    {
                                        Header: 'Naam',
                                        accessor: 'cursustitel',
                                    },
                                    {
                                        Header: 'Prijs',
                                        id: 'prijs',
                                        accessor: d => '€ ' + (d.cursusprijs / 100).toFixed(2) + ',-',
                                    },
                                    {
                                        Header: 'Begin',
                                        accessor: 'begindatum',
                                    },
                                    {
                                        Header: 'Eind',
                                        accessor: 'einddatum',
                                    },
                                    {
                                        Header: 'Aantal inschrijvingen',
                                        id: 'aantalInschrijvingen',
                                        accessor: d => d.inschrijvingen.length,
                                    },
                                ]}
                            />
                        }
                        {this.state.selectedOption.length <= 0 &&
                        <h3 style={{ textAlign: 'right' }}>Totaal: &euro;&thinsp;{(sum / 100).toFixed(2)},-</h3>}

                        {/* If cursus was selected, use different ReactTable variant */}
                        {(!!this.state.selectedOption && !!this.state.cursistenData) && (
                            <ReactTable
                                data={this.state.cursistenData.cursisten}
                                columns={[
                                    {
                                        Header: 'Gebruikersnaam',
                                        accessor: 'username',
                                    },
                                    {
                                        Header: 'Rol',
                                        accessor: 'role',
                                    },
                                ]}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default compose()(ViewCursussen);
