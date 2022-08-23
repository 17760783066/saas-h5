import React from 'react'
import '../assets/css/img-editor.scss'
import OSSWrap from '../common/OSSWrap.jsx';
import ReactAvatarEditor from 'react-avatar-editor'
import {Toast} from 'antd-mobile'
import U from "./U";
import ImgToBase64 from "./ImgToBase64";

const scale_min = 1;
const scale_max = 2;

export default class ImgEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {x: 0.5, y: 0.5},
            scale: 1,
            rotate: 0,
            preview: null,
            width: 0,
            height: 0,
            aspectRatio: this.props.aspectRatio,
            type: this.props.type,
            image: null,
            upload_progress: 0,
            uploading: false
        };
    }

    closeEditor = () => {
        this.props.showImgEditor();
    };

    handleImgSaved = (url, type) => {
        this.props.handleImgSaved(url, type);
        this.closeEditor();
    };

    componentDidMount() {

        let width = (window.innerWidth - 30) * 2;//padding+黑边
        let height = width * this.state.aspectRatio;

        let canvas = document.getElementsByTagName('canvas')[0];
        canvas.style.top = '-' + height / 4 + 'px';

        this.setState({
            width: width,
            height: height
        });

        let url = this.props.url;
        if (url) {
            ImgToBase64({url: url}, (base64) => {
                let img = U.base64.getBlobBydataURI(base64, 'image/jpeg');
                let file = new File([img], "load_canvasfile_" + Date.parse(new Date()) + ".png");
                this.setState({
                    image: file
                })
            });
        }

    }

    handleNewImage = e => {
        this.setState({image: e.target.files[0], uploading: false})
    };

    handleSave = () => {

        let {image, uploading, type} = this.state;

        if (U.str.isEmpty(image)) {
            Toast.show({content:'请选择图片...'});
            return;
        }

        if (uploading) {
            Toast.show({icon: 'loading',
            content: '上传中'});
            return;
        }

        this.setState({uploading: true});

        Toast.show({content:'上传中...',icon:'loading'});

        const base64 = this.editor.getImageScaledToCanvas().toDataURL();

        let img = U.base64.getBlobBydataURI(base64, 'image/jpeg');
        img.name = "canvasfile_" + Date.parse(new Date()) + ".png";

        OSSWrap.upload(img).then((result) => {
            Toast.clear();
            this.handleImgSaved(result.url, type);
        }).catch(function (err) {
            Toast.show({
                icon: 'fail',
                content: {err},
              });
        });
    };

    rotateLeft = (e) => {
        e.preventDefault();
        this.setState({
            rotate: this.state.rotate - 90,
            width: this.state.height,
            height: this.state.width
        })
    };

    modRange = (add) => {
        let {scale} = this.state;
        if (add) {
            scale = Math.min(scale + 0.1, scale_max);
        } else {
            scale = Math.max(scale - 0.1, scale_min);
        }
        Toast.show({content:'x' + scale.toFixed(1)});
        this.setState({
            scale
        })
    };

    setEditorRef = editor => {
        if (editor) this.editor = editor
    };

    handlePositionChange = position => {
        this.setState({position})
    };

    render() {

        let {scale, width, height, position, rotate, image} = this.state;
        return <div className="img-editor" style={{height: window.innerHeight + 'px'}}>
            <div className="close" onClick={this.closeEditor}><i/></div>

            <ReactAvatarEditor
                ref={this.setEditorRef}
                scale={parseFloat(scale)}
                width={width}
                height={height}
                border={[1, 1]}
                color={[255, 255, 255, 0.8]}
                position={position}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(rotate)}
                onSave={this.handleSave}
                image={image}/>

            <div className="control">

                <div className="bar">
                    <i className="lessen" onClick={() => {
                        this.modRange(false);
                    }}/>
                    <input type='range' onChange={e => {
                        const scale = parseFloat(e.target.value);
                        Toast.show({content:'x ' + scale});
                        this.setState({scale});
                    }} value={scale}
                           min={scale_min} max={scale_max} step='0.1' className="range"/>
                    <i className="largen" onClick={() => {
                        this.modRange(true);
                    }}/>
                </div>

                <div className="btns">

                    <button className="uploader">
                        <input className="file" accept="image/*" type='file' onChange={this.handleNewImage}/>
                    </button>

                    <button className="i-rotate" onClick={this.rotateLeft}/>

                    <button className="submit" onClick={this.handleSave}/>
                </div>

            </div>

        </div>
    }

}
