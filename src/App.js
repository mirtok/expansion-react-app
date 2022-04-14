import { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import './App.css';
import { dataList } from './demo';

Array.prototype.remove = function (element) {
	for (let i = 0; i < this.length; i++) {
		if (this[i] === element) {
			this.splice(i, 1);
		}
	}
	return this;
};

const App = () => {
	const [renderList, setRenderList] = useState([]);

	const [checkNode, setCheckNode] = useState([]);

	// item 点击事件
	const clickItem = (item, floor) => {
		if (item.groups.length === 0 || !item.groups) {
			const oldNodeList = Array.from(new Set([...checkNode]));
			if (oldNodeList.includes(item.name)) {
				oldNodeList.remove(item.name);
			} else {
				oldNodeList.push(item.value);
			}
			setCheckNode(oldNodeList);
			return;
		}
		const { label, value } = item;
		const data = [...renderList];
		data[floor] = item.groups;
		if (floor) {
			data.splice(floor + 1);
		}
		// 渲染子节点
		setRenderList(data);
		// 除了最后一个所有节点只能选择一个
		const oldNodeList = [...checkNode];
		const similarList = checkNode.filter(item => item.includes(label));
		if (similarList.length > 0) {
			similarList.forEach(item => oldNodeList.remove(item));
		}
		oldNodeList.push(value);
		setCheckNode(oldNodeList);
	};

	useEffect(() => {
		console.log('=============checkNode=======================');
		console.log(checkNode);
		console.log('=============checkNode=======================');
	}, [checkNode]);

	// 渲染每第一个item
	const renderItem = item => {
		return (
			<div key={item.name + Date.now()}>
				<Row>
					<Col md={12}>
						<h3>{item.name}</h3>
					</Col>
				</Row>
				<ButtonGroup>
					{item.children.map((cItem, index) => {
						return (
							<span key={cItem.value}>
								<Button
									variant={checkNode.includes(cItem.value) ? 'primary' : 'default'}
									onClick={() => clickItem(cItem, 0)}>
									{cItem.name}
								</Button>
							</span>
						);
					})}
				</ButtonGroup>
			</div>
		);
	};

	const renderOtherItem = (groups, floor = null) => {
		return (
			<div key={Date.now() + Math.random()}>
				<Row>
					<Col md={12}>
						<h3>{groups[0].label}</h3>
					</Col>
				</Row>
				<div>
					{groups.map((cItem, index) => {
						return (
							<span key={cItem.value}>
								<Button
									variant={checkNode.includes(cItem.value) ? 'primary' : 'default'}
									className="mb-2 mr-2"
									onClick={() => clickItem(cItem, floor)}>
									{cItem.name}
								</Button>
								{(index + 1) % 10 === 0 ? <br /> : null}
							</span>
						);
					})}
				</div>
			</div>
		);
	};
	return (
		<div className="App">
			{dataList.map(item => (
				<div key={item.value + Date.now()}>{renderItem(item)}</div>
			))}
			{renderList.map((item, index) => renderOtherItem(item, index + 1))}
		</div>
	);
};

export default App;
