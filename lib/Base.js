import FileMessageBuilder from './message/FileMessageBuilder';
import VideoMessageBuilder from './message/VideoMessageBuilder';
import AudioMessageBuilder from'./message/AudioMessageBuilder';
import QuickRepliesMessageBuilder from './message/QuickRepliesMessageBuilder';
import TextMessageBuilder from './message/TextMessageBuilder';
import AttachmentMessageBuilder from './message/AttachmentMessageBuilder';
import ImageMessageBuilder from './message/ImageMessageBuilder';
import EventEmitter from 'eventemitter3';

export default class Base extends EventEmitter {


    static TextMessageBuilder() {
        return new TextMessageBuilder();
    }

    static AttachmentMessageBuilder() {
        return new AttachmentMessageBuilder();
    }

    static ImageMessageBuilder() {
        return new ImageMessageBuilder();
    }

    static AudioMessageBuilder() {
        return new AudioMessageBuilder();
    }

    static VideoMessageBuilder() {
        return new VideoMessageBuilder();
    }

    static FileMessageBuilder() {
        return new FileMessageBuilder();
    }

    static QuickRepliesMessageBuilder() {
        return new QuickRepliesMessageBuilder();
    }


};