import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Selector from '../common/Selector';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Message from '../../utils/Message';

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 645,
		maxHeight: 755,
		width: '100%',
		height: '100%'
	},
	media: {
		height: 540
	},
	btn1: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 320
	},
	textField2: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 420
	},
	button: {
		backgroundColor: '#7347ed',
		width: '75%',
		marginLeft: '13%'
	}
}));

export default function InputCardPost(props) {
	const classes = useStyles();
	const opts = ['GENERAL', 'PROGRAMMING', 'PHILOSOPHY', 'DREAMS', 'LISTS'];

	const [image, setImage] = useState(null);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [category, setCategory] = useState(opts[0]);

	const handleFile = e => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (!title || !body || !category)
			props.showAlert(
				new Message('warn', 'Please fill the required fields!')
			);

		const data = new FormData();
		data.append('image', image);
		data.append('title', title);
		data.append('body', body);
		data.append('title', category);
		props.createPost(data);
	};

	const handleCategory = category => {
		setCategory(category);
	};

	return (
		<Card className={classes.card}>
			<CardActionArea>
				<CardContent>
					<Typography
						style={{ textAlign: 'center', fontSize: '18px' }}
						variant='body2'
						color='textSecondary'
						component='h1'>
						New post
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.btn1}>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'column'
					}}>
					<TextField
						id='outlined-basic'
						className={classes.textField}
						label='Title of your post'
						margin='normal'
						variant='outlined'
						onChange={e => setTitle(e.target.value)}
					/>
					<TextField
						id='outlined-basic'
						className={classes.textField2}
						label='Body of your post'
						margin='normal'
						variant='outlined'
						multiline
						rows='20'
						onChange={e => setBody(e.target.value)}
					/>
					<div style={{ marginBottom: '5%' }}>
						<Selector
							setCategory={handleCategory}
							label={'Category'}
							opts={opts}
						/>
					</div>
					<input
						accept='image/*'
						style={{ display: 'none' }}
						id='outlined-button-file'
						multiple
						type='file'
						onChange={e => handleFile(e)}
					/>
					<label htmlFor='outlined-button-file'>
						<Button
							variant='contained'
							component='span'
							className={classes.button}
							color='primary'
							startIcon={<CloudUploadIcon />}>
							Upload
						</Button>
					</label>

					<Button
						style={{ marginTop: '5%' }}
						variant='contained'
						color='#7347ed'
						startIcon={<Icon>send</Icon>}
						type='submit'
						className={classes.button}
						onClick={e => handleSubmit(e)}
						color='primary'>
						Submit
					</Button>
				</div>
			</CardActions>
		</Card>
	);
}
