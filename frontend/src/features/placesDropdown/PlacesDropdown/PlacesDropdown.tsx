import { useEffect, useState } from 'react';
import { DropdownButton } from 'shared/ui';
import { Place } from 'entities/place';
import { selectPlaces, setPlaces } from 'app/providers/store/app';
import { useDispatch, useSelector } from 'react-redux';
import { type PlaceI } from 'entities/place/api/placeApi.interface';

interface PlacesDropdownProps {
	className?: string;
	state?: any;
	setState?: any;
	single?: boolean;
	editing?: boolean;
}
export default function PlacesDropdown({
	state,
	setState,
	className,
	single,
	editing
}: PlacesDropdownProps) {
	const dispatch = useDispatch();
	const places = useSelector(selectPlaces);
	const [data, setData] = useState<PlaceI[]>([]);

	useEffect(() => {
		getPlace();
	}, [places]);

	async function getPlace() {
		if (places) {
			setData(places);
		} else {
			const [data, err] = await Place.get();

			if (err) return;
			dispatch(setPlaces(data));
		}
	}
	return (
		<DropdownButton
			editing={editing}
			className={className}
			title="Выберите площадку"
			state={state}
			setState={setState}
			data={data}
			single={single}
		/>
	);
}
